import {Helmet} from 'react-helmet-async'

const Title = ({title = 'ConnectPro.', description = 'Connect with professionals'}) => {
  return ( <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
  )
}

export default Title