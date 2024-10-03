import React from "react"
import AppLayout from "../components/layout/AppLayout"

const Home = () => {
  return <p>Home</p>
}

const WrappedHome = React.memo(AppLayout()(Home), () => true)
WrappedHome.displayName = 'WrappedHome' // add a display name

export default WrappedHome
