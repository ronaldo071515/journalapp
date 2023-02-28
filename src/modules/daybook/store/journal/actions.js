import journaApi from "@/api/journalApi"

// export const myAction = async ({ commit }) => {
// }
export const loadEntries = async ({ commit }) => {

    const { data } = await journaApi.get('/entries.json')

    if( !data )
        return commit('setEntries', [])

    const entries = []
    for(let id of Object.keys( data )) {
        entries.push({
            id,
            ...data[id]
        })
    }
    // console.log(entries)
    commit('setEntries', entries)
    
}

export const updateEntry = async ({ commit }, entry) => {
    
    // const { id, ...dataTosave } = entry
    // const { data } = await journaApi.put(`/entries/${ id }.json`, dataTosave)
    // commit('updateEntry', { ...data, id })

    const { date, picture, text } = entry
    const dataTosave = { date, picture, text }
    await journaApi.put(`/entries/${ entry.id }.json`, dataTosave)

    dataTosave.id = entry.id

    commit('updateEntry', { ...dataTosave })

}

export const createEntry = async ({ commit }, entry) => {

    const { date, picture, text } = entry
    const dataTosave = { date, picture, text }
    const { data } = await journaApi.post(`/entries.json`, dataTosave)

    dataTosave.id = data.name

    commit('addEntry', dataTosave)

    return data.name

}

export const deleteEntry = async ({ commit }, id) => {

    await journaApi.delete(`/entries/${ id }.json`)

    commit('deleteEntry', id)

    return id

}