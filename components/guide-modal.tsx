import React from 'react'
import { useState, useEffect } from 'react'

import { Modal, Button } from 'react-bootstrap'
import dynamic from 'next/dynamic'

interface Props {
  show: boolean
  handleHide: any
}

const GuideModal = (props: Props) => {
  const IconArrows: any = dynamic(() => import('../public/assets/icons/' + 'gamepad-arrows.svg'))
  const IconNum1: any = dynamic(() => import('../public/assets/icons/' + 'gamepad-num1.svg'))
  const IconNum2: any = dynamic(() => import('../public/assets/icons/' + 'gamepad-num2.svg'))
  const IconKeyA: any = dynamic(() => import('../public/assets/icons/' + 'gamepad-numA.svg'))
  const IconKeyS: any = dynamic(() => import('../public/assets/icons/' + 'gamepad-numS.svg'))
  const IconKeyD: any = dynamic(() => import('../public/assets/icons/' + 'gamepad-numD.svg'))
  const IconKeyZ: any = dynamic(() => import('../public/assets/icons/' + 'gamepad-numZ.svg'))
  const IconKeyX: any = dynamic(() => import('../public/assets/icons/' + 'gamepad-numX.svg'))
  const IconKeyC: any = dynamic(() => import('../public/assets/icons/' + 'gamepad-numC.svg'))
  return (
    <Modal show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Key Control Guide</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ paddingTop: '5vh' }}>
        <IconArrows width='80' height='80' style={{ marginLeft: '3vh' }} />
        <span style={{ marginLeft: '1vh' }}>Move</span>
        <IconNum1 width='26' height='26' style={{ marginLeft: '8vh' }} /> <span>Insert Coin</span>
        <IconNum2 width='26' height='26' style={{ marginLeft: '8vh' }} /> <span>Start</span>
        <div style={{ marginTop: '5vh' }}>
          <IconKeyA width='26' height='26' style={{ marginLeft: '3vh' }} />
          <IconKeyD width='26' height='26' style={{ marginLeft: '1vh' }} />
          <IconKeyS width='26' height='26' style={{ marginLeft: '1vh' }} /> <span>Button 1, 2, 3</span>
        </div>
        <div style={{ marginTop: '1vh' }}>
          <IconKeyZ width='26' height='26' style={{ marginLeft: '3vh' }} />
          <IconKeyX width='26' height='26' style={{ marginLeft: '1vh' }} />
          <IconKeyC width='26' height='26' style={{ marginLeft: '1vh' }} /> <span>Button 4, 5, 6</span>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default GuideModal
