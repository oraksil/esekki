import React from 'react'

import { Modal } from 'react-bootstrap'

import Icon from './icon'

interface Props {
  show: boolean
  handleHide: any
}

const GuideModal = (props: Props) => {
  const IconArrows = () => <Icon name='gamepad-arrows' width={84} height={84} />
  const IconKey = ({ name }: any) => <Icon name={name} width={26} height={26} />
  const IconKeyCoin = () => <IconKey name='gamepad-num1' />
  const IconKeyStart = () => <IconKey name='gamepad-num2' />
  const IconKeyA = () => <IconKey name='gamepad-numA' />
  const IconKeyS = () => <IconKey name='gamepad-numS' />
  const IconKeyD = () => <IconKey name='gamepad-numD' />
  const IconKeyZ = () => <IconKey name='gamepad-numZ' />
  const IconKeyX = () => <IconKey name='gamepad-numX' />
  const IconKeyC = () => <IconKey name='gamepad-numC' />

  return (
    <Modal show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Key Control Guide</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '20px 40px' }}>
        <div>
          <span>
            <IconKeyCoin />
            <span style={{ marginLeft: '10px' }}>Insert Coin</span>
          </span>
          <span style={{ marginLeft: '20px' }}>
            <IconKeyStart />
            <span style={{ marginLeft: '20px' }}>Start</span>
          </span>
        </div>
        <div style={{ marginTop: '30px' }}>
          <div style={{ display: 'inline-block' }}>
            <div>
              <span>
                <IconKeyA />
              </span>
              <span style={{ marginLeft: '10px' }}>
                <IconKeyD />
              </span>
              <span style={{ marginLeft: '10px' }}>
                <IconKeyS />
              </span>
              <span style={{ marginLeft: '20px' }}>Button 1, 2, 3</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <span>
                <IconKeyZ />
              </span>
              <span style={{ marginLeft: '10px' }}>
                <IconKeyX />
              </span>
              <span style={{ marginLeft: '10px' }}>
                <IconKeyC />
              </span>
              <span style={{ marginLeft: '20px' }}>Button 4, 5, 6</span>
            </div>
          </div>
          <div style={{ float: 'right', marginTop: '-6px' }}>
            <IconArrows />
            <span style={{ marginLeft: '20px' }}>Move</span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default GuideModal
