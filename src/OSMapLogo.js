function OSMapLogo () {
  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(100%-120px)',
        bottom: '60px',
        zIndex: 2,
        width: '100%'
      }}
    >
      <a
        href='https://www.ordnancesurvey.co.uk'
        style={{
          position: 'absolute',
          display: 'block',
          margin: 'auto',
          left: '10px',
          height: '50px',
          bottom: '10px',
          zIndex: '99999',
          overflow: 'hidden'
        }}
        target='_blank'
        rel='noreferrer'
      >
        <img
          src='https://raw.githubusercontent.com/OrdnanceSurvey/os-api-branding/4604a642bda5dc3c5e600f4cb095aa8a0934dc05/img/os-logo-maps.svg'
          width='120'
          alt='OS logo'
        />
      </a>
    </div>
  )
}

export default OSMapLogo
