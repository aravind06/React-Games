import { Container } from '@material-ui/core';
import Chatbot from '../src/chatbot';
import StoryPage from './StoryPage';
function App() {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Chatbot />
    </Container>
  );
}

export default App;
