import bbsListSnake from '@/bbs.yml'
import camelcaseKeys from 'camelcase-keys'
import axios from 'axios'
import url from 'url'
import iconv from 'iconv-lite'
const bbsList = camelcaseKeys(bbsListSnake)

const ENCODINGS = {
    shitaraba: 'EUC-JP',
    others: 'CP932'
}

const PARSER = {
    shitaraba: (lines, subjectUrl) => {
        const urlProtrol = url.parse(subjectUrl).protocol
        const urlMatched = subjectUrl.match(/jbbs\.shitaraba\.net\/(otaku\/\d+)/)
        const board = urlMatched[1]
        if (urlMatched) {
            return lines.map(line => {
                const lineMatched = line.match(/(\d{10})\.cgi,(.+)\(\d+\)/)
                if (lineMatched) {
                    const key = lineMatched[1]
                    const title = lineMatched[2]
                    const dir = board.split('/')[0]
                    const bbs = board.split('/')[1]
                    return {
                        datUrl: `${urlProtrol}//jbbs.shitaraba.net/bbs/rawmode.cgi/${dir}/${bbs}/${key}`,
                        writeUrl: `${urlProtrol}//jbbs.shitaraba.net/bbs/write.cgi/${dir}/${bbs}/${key}`,
                        title,
                        dir,
                        bbs
                    }
                } else {
                    return {}
                }
            }).filter(thread => !!thread)
        }
    },
    others: (lines, subjectUrl) => {
        const urlProtrol = url.parse(subjectUrl).protocol
        const urlHostname = url.parse(subjectUrl).hostname
        const urlPath = url.parse(subjectUrl).path
        const urlMatched = urlPath.match(/\/(.+)\/(?:subject\.txt)?/)
        const board = urlMatched[1]
        if (urlMatched) {
            return lines.map(line => {
                const lineMatched = line.match(/(\d{10})\.dat<>(.+)\(\d+\)/)
                if (lineMatched) {
                    const key = lineMatched[1]
                    const title = lineMatched[2]
                    return {
                        datUrl: `${urlProtrol}//${urlHostname}/${board}/${key}.dat`,
                        writeUrl: `${urlProtrol}//${urlHostname}/test/bbs.cgi`,
                        title,
                        bbs: board
                    }
                }
            }).filter(thread => !!thread)
        }
    }
}

const axiosInstance = axios.create({
    responseType: 'arraybuffer'
})
axiosInstance.interceptors.response.use(res => {
    const encoding = (() => {
        const hostname = url.parse(res.request.responseURL).hostname
        if (hostname.search(/shitaraba\.net$/) !== -1) {
            return ENCODINGS.shitaraba
        } else {
            return ENCODINGS.others
        }
    })()
    res.data = iconv.decode(Buffer.from(res.data), encoding).toString()
    return res
})
const state = {
    bbsList
}

const mutations = {
    SELECT_THREAD (state, {index}) {
        state.bbsList = {
            ...state.bbsList,
            [index]: {
                ...state.bbsList[index],
                selectedIndex: index
            }
        }
    },
    SET_THREADS (state, {index, threads}) {
        state.bbsList = {
            ...state.bbsList,
            [index]: {
                ...state.bbsList[index],
                threads
            }
        }
    }
}

const actions = {
    fetchThreads ({commit}, index) {
        axiosInstance.get(bbsList[index].subjectUrl)
            .then(res => {
                const threadLines = res.data.split('\n')
                const parser = (() => {
                    const hostname = url.parse(res.request.responseURL).hostname
                    if (hostname.search(/shitaraba\.net$/) !== -1) {
                        return PARSER.shitaraba
                    } else {
                        return PARSER.others
                    }
                })()
                commit('SET_THREADS', {index, threads: (parser(threadLines, bbsList[index].subjectUrl))})
            })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
