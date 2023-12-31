import React, { createRef } from 'react'

import { Link } from "react-router-dom";

import 'semantic-ui-css/semantic.min.css'
import {
  Dimmer,
  Loader,
  Grid,
  Message,
} from 'semantic-ui-react'
import {  useSubstrateState } from '../substrate-lib'
import AccountSelector from '../AccountSelector'

function Main() {
  const { apiState, apiError, keyringState } = useSubstrateState()
  

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  }

  const contextRef = createRef()

  return (
    <div >
              <div id="header">
        <Link to='/' id='logo'>Pokapet</Link>

        <div id="link-containers">
          <Link to='/' >Home</Link>
          <Link to='/mintnft' >MintNFT</Link>
          <Link to='/game' >Game</Link>
          <a>Community</a>
          <a>Q&A</a>
          <a>White Paper</a>
          <Link to='/blockchaininfo' >Blockchain Info</Link>
          

        </div>
        {/* <div context={contextRef}><AccountSelector /> </div> */}
         
        <AccountSelector context={contextRef}/>
      </div>
  

    </div>
  )
}

export default function Header() {
  return (
   
      <Main />

  )
}
