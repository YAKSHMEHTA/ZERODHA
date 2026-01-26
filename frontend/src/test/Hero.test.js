import React from 'react'
import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Hero from '../landing_page/home/Hero'

// test suite
describe('Hero Component',()=>{
    test('render hero img',()=>{
        render(<Hero></Hero>)
        const heroImage = screen.getAllByAltText("image")
        expect(heroImage).toBeInDocument()
        expect(heroImage).toHaveAttribute()

    })
})