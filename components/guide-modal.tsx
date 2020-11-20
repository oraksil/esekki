import React from 'react'

import { Modal } from 'react-bootstrap'
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
      <Modal.Body style={{ padding: '20px 40px' }}>
        <div>
          <IconNum1 width='26' height='26' />
          <span style={{ marginLeft: '10px' }}>Insert Coin</span>
          <IconNum2 width='26' height='26' style={{ marginLeft: '20px' }} />
          <span style={{ marginLeft: '20px' }}>Start</span>
        </div>
        <div style={{ marginTop: '30px' }}>
          <div style={{ display: 'inline-block' }}>
            <div>
              <IconKeyA width='26' height='26' />
              <IconKeyD width='26' height='26' style={{ marginLeft: '10px' }} />
              <IconKeyS width='26' height='26' style={{ marginLeft: '10px' }} />
              <span style={{ marginLeft: '20px' }}>Button 1, 2, 3</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <IconKeyZ width='26' height='26' />
              <IconKeyX width='26' height='26' style={{ marginLeft: '10px' }} />
              <IconKeyC width='26' height='26' style={{ marginLeft: '10px' }} />
              <span style={{ marginLeft: '20px' }}>Button 4, 5, 6</span>
            </div>
          </div>
          <div style={{ float: 'right', marginTop: '-6px' }}>
            <IconArrows width='84' height='84' />
            <span style={{ marginLeft: '20px' }}>Move</span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default GuideModal
