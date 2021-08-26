import styled from "styled-components";
import Carousel from 'react-material-ui-carousel'
import { Card, CardActionArea, CardContent } from '@material-ui/core';

export const MainCarousel = styled(Carousel)`
    width: 90%;
    height: 80%;
    margin: 5%;
    padding: 4%;
    background-color: rgba(255, 255, 255, 0.222);
    
    
    

    div{
        height: 100%;
    }

    



`
export const CardSlide = styled(Card)`
    background-image: url(${props => props.src});
    background-size: 100%;
    background-repeat: no-repeat;

    

`
export const CardHeader = styled.div`
background-color: rgba(0, 0, 0, 0.567);
    display: flex;
    width: 100%;
    
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    
    background-size: 100%;
    flex-direction: column;

    p{
        padding: 0% 10%;
        color: white;
    }
    .MuiButton-root{
        max-width: 20%;
    }

    

`