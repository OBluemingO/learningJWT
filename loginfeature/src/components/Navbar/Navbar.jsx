import styled, { keyframes } from "styled-components"
import { IconLogo } from "assest/icon"

const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: black;
  display: flex;
`

const WrapLogo = styled.div`
  background-color: yellow;
  width: 300px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  padding-left: 50px;
`

const WrapMenuCenter = styled.div`
    background-color: green;
    width: 300px;
    height: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const fadeInMenu = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0%);
  }
  25% {
    opacity: 0;
    transform: translateY(100%);
  }
  50% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`

const Menu = styled.div`
  width: 10%;
  height: 25%;
  border-radius: 18px;
  border: 1px solid black;
  margin-right: 7.5px;
  text-transform: uppercase;
  display: grid;
  place-items: center;
  font-size: 0.725rem;

  p{
    margin: 0;
    padding: 0;
  }

  :hover{
    p{
      animation: 0.7s ${fadeInMenu} ease-in-out;
    }
  }
`

const WrapMenuRight = styled.div`
    background-color: yellow;
    width: 300px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const TextLogo = styled.h3`
  margin-left: 20px;
`

const WrapLanguage = styled.div`
  
`

const ButtonLanguage = styled.button`
  border: none;
  background: none;

  ::after{
    content: " ";
    display: block;
    width: 0%;
    height: 1px;
    background-color: black;
  }

  :hover{
    ::after{
      content: " ";
      display: block;
      width: 100%;
      height: 1px;
      background-color: black;
    }
  }

`

const ButtonHiring = styled.button`
  text-transform: uppercase;
  background: none;
  border: 1px solid black;
  font-size: 1.25rem;
  padding: 15px;
`

const Navbar = () => {
  return (
    <Container>
      <WrapLogo><IconLogo width="50" height="50"/> <TextLogo>Bizcuxxzh</TextLogo></WrapLogo>
      <WrapMenuCenter>
        <Menu><p>about</p></Menu>
        <Menu><p>skill</p></Menu>
        <Menu><p>experience</p></Menu>
        <Menu><p>contact</p></Menu>
      </WrapMenuCenter>
      <WrapMenuRight>
        <WrapLanguage>
          <ButtonLanguage>TH</ButtonLanguage>
          <ButtonLanguage>EN</ButtonLanguage>
        </WrapLanguage>
        <ButtonHiring>Hiring</ButtonHiring>
      </WrapMenuRight>
    </Container>
  )
}

export default Navbar