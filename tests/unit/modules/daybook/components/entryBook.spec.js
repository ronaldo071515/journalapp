import { shallowMount } from "@vue/test-utils";
import EntryBook from '@/modules/daybook/components/EntryBook.vue'
import { journalState } from '../../../mock-data/test-journal-state';

describe('Pruebas en el entry component', () => {

    const mockRouter = {
        push: jest.function
    }

    const wrapper = shallowMount( EntryBook, {
        props: {
            entry: journalState.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    })

    test('debe de hacer match con el snapshot', () => {
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('debe de redireccionar al hacer click en el entry-container', () => {
        
        const entryContainer = wrapper.find('.entry-container')
        entryContainer.trigger('click')

        expect( mockRouter.push ).toHaveBeenCalledWith({
            name: 'entry',
            params: {
                id: '-NNcu2p47VN3_Fvl5dIr'
            }
        })

    })

    test('pruebas en las propiedades computadas', () => {
        
    })

})