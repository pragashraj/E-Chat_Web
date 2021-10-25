import React from 'react'

import { Grid } from '@mui/material'

import InputHeader from '../../components/InputHeader'

import './Home.css'

const Aside = () => {

    const renderHeader = () => {
        return (
            <Grid container>
                <Grid item xs = {12}>
                    <InputHeader placeholder = "Search"/>
                </Grid>
            </Grid>
        )
    }

    return (
        <div className = "aside_root">
            <div className = "aside_header">
                { renderHeader() }
            </div>
        </div>
    )
}

export default Aside
