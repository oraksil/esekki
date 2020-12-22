const footerStyle = {
  height: '60px',
  position: 'fixed',
  bottom: '0px',
  left: '0px',
  width: '100%',
  textAlign: 'center',
  padding: '20px 0',
  backgroundColor: '#343a40',
  color: '#d6d6d6',
}

const emailStyle = {
  color: '#b2bac1',
}

const Footer = () => {
  return (
    <footer style={footerStyle}>
      Feedback:{' '}
      <a style={emailStyle} href='mailto://amsalegend@gmail.com'>
        amsalegend@gmail.com
      </a>
    </footer>
  )
}

export default Footer
