const footerStyle = {
  position: 'fixed',
  height: '60px',
  bottom: '0px',
  left: '0px',
  width: '100%',
  textAlign: 'center',
  padding: '20px 0',
  backgroundColor: '#343a40',
  color: '#d6d6d6',
} as React.CSSProperties

const emailStyle = {
  color: '#b2bac1',
} as React.CSSProperties

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
