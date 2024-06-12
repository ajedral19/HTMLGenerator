import { configureStore } from '@reduxjs/toolkit'
import modalSliceReducer from './Redux/Slices/modal'
import templatesReducer from './Redux/Slices/templates'

export default configureStore({
    reducer: {
        modal: modalSliceReducer,
        templates: templatesReducer
    }
})