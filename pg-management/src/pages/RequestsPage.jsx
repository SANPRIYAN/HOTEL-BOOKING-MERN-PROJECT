// src/pages/RequestsPage.jsx
import RequestForm from '../components/RequestForm';
import RequestList from '../components/RequestList';

export default function RequestsPage({ user }) {
  const { username, role } = user;

  return (
    <div>
      <h2>Requests</h2>
      {role !== 'admin' && <RequestForm username={username} />}
      <RequestList username={username} role={role} />
    </div>
  );
}
