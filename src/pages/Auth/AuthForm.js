import React from 'react';
import styled from '@emotion/styled/macro'

const AuthForm = styled.section({
    width: "100%",
    margin: "3rem 0",
    display: "flex",
    flexDirection:"column"
})



const auth = props => <AuthForm>{props.children}</AuthForm>;

export default auth;