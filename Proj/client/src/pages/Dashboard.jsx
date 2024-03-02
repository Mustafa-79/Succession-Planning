import {useLocation} from 'react-router-dom'

export default function Dashboard() {
  const location = useLocation();

  return (
    <div>
        <h1>Dashboard</h1>
        <h2>Hi {location.state.name}!</h2>
    </div>
  )
}
