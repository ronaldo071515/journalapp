import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'


const  createVuexStore = ( initialState ) => 
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState }
            }
        }
    })

describe('vuex - pruebas en el journa module', () => {

    //Basicas
    test('este es el estado inicial, debe de tener este state', () => {

        const store = createVuexStore( journalState )
        const { isLoading, entries } = store.state.journal
        
        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )
        
    })
    
    //mutations
    test('mutations: setEntries', () => {
        
        const store = createVuexStore({ isLoading: true, entries: [] })
        
        store.commit('journal/setEntries', journalState.entries)

        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.isLoading ).toBeFalsy()

    })

    test('mutations: updateEntry', () => {

        const store = createVuexStore( journalState )
        const updateEntry = {
            id: '-NNcu2p47VN3_Fvl5dIe',
            date: 1675723525729,
            text: 'hola mundo desde pruebas'
        }
        store.commit('journal/updateEntry', updateEntry)
        
        const storeEntries = store.state.journal.entries
        
        expect( storeEntries.length ).toBe(2)
        expect( 
            storeEntries.find(e => e.id === updateEntry.id) 
            ).toEqual(updateEntry)
            
        })
        
        test('mutations: addEntry deleteEntry', () => {
            
            const store = createVuexStore( journalState )

            store.commit('journal/addEntry', { id:'ABC-123', text: 'Hola mundillo' })
            
            const storeEntries = store.state.journal.entries
            
            expect( storeEntries.length ).toBe(3)
            expect( storeEntries.find(e => e.id === 'ABC-123') ).toBeTruthy()
            // expect( storeEntries.find(e => e.id === 'ABC-123') ).toEqual( { id:'ABC-123', text: 'Hola mundillo' } )
            
            store.commit('journal/deleteEntry', 'ABC-123')

            const storeEntriesDelet = store.state.journal.entries

            expect( storeEntriesDelet.length ).toBe(2)
            expect( storeEntriesDelet.filter(e => e.id !== 'ABC-123' ) ).toEqual(journalState.entries)

    })


    //Getters

    test('getters: getEntriesByTerm getEntryById', () => {

        const store = createVuexStore( journalState )

        const [ entry1, entry2 ] = journalState.entries

        expect( store.getters['journal/getEntriesByTerm']('').length ).toBe(2)
        expect( store.getters['journal/getEntriesByTerm']('segunda').length ).toBe(0)
        
        // expect( store.getters['journal/getEntriesByTerm']('segunda').length ).toEqual(0)
        // expect( store.getters['journal/getEntriesByTerm']('segunda').length ).toEqual([ entry1, entry2 ])
        expect( store.getters['journal/getEntryById']('-NNcu2p47VN3_Fvl5dIr') ).toEqual(entry1)
    })


    //Actions
    test('actions: loadEntries', async () => {

        const store = createVuexStore({ isLoading: true, entries: [] })

        await store.dispatch('journal/loadEntries')

        expect( store.state.journal.entries.length ).toBe(1)

    })
    

    test('actions: updateEntry', async () => {

        const store = createVuexStore(journalState)

        const updateEntry =  {
            id: '-NNcu2p47VN3_Fvl5dIr',
            date: 1675723525729,
            picture: 'https://res.cloudinary.com/dmjkmiwrz/image/upload/v1675790013/szfl8vx64grducyioam6.png',
            text: 'Hoy 06 de febrero de 2023, estoy aprendiendo vuejs y vuex con fernando herrera! con testing :('
        }

        await store.dispatch('journal/updateEntry', updateEntry)

        expect( store.state.journal.entries.length ).toBe(2)
        expect(
            store.state.journal.entries.find(e => e.id === updateEntry.id)
        ).toEqual({
            id: '-NNcu2p47VN3_Fvl5dIr',
            date: 1675723525729,
            picture: 'https://res.cloudinary.com/dmjkmiwrz/image/upload/v1675790013/szfl8vx64grducyioam6.png',
            text: 'Hoy 06 de febrero de 2023, estoy aprendiendo vuejs y vuex con fernando herrera! con testing :('
        })

    })

    test('should createEntry deleteEntry', async() => {
        // createStore
        const store = createVuexStore(journalState)

        //newEntry
        const newEntry = { date: 1675723525729, text: 'Nueva entrada desde las pruebas' }
        
        //dispatch y obtener el id de la nueva entrada
        const id = await store.dispatch('journal/createEntry', newEntry)

        //el id debe de ser un string
        expect( typeof id ).toBe('string')
        //debe de existir la nueva entrada en el state
        expect( store.state.journal.entries.find(e => e.id === id) ).toBeTruthy()

        //dispatch deleteEntry
        await store.dispatch('journal/deleteEntry', id)

        //La nueva entrada no debe de existir en el state.journal
        expect( store.state.journal.entries.find(e => e.id === id) ).toBeFalsy()
    })

})