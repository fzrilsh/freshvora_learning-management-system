import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Stack,
  Modal,
  Fab,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  GlobalStyles,
  IconButton,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

// --- Helper Data (from original JS) ---
const DEMO_NAMES = ['Andi', 'Sari', 'Budi', 'Rina', 'Dedi', 'Maya', 'Yoga', 'Tini', 'Agus', 'Lila'];
const COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
const TOTAL_TABLES = 6;
const CHAIRS_PER_TABLE = 4;

// --- Sub-component for the Meeting Room ---
const MeetingRoom = ({ onLeave }) => {
  const [participants, setParticipants] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null); // { table, chair }
  const [nameInput, setNameInput] = useState('');
  const [isMuted, setMuted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'System', text: 'Welcome to the group chat!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(msgs => [...msgs, { sender: currentUser?.name || 'Me', text: chatInput.trim() }]);
    setChatInput('');
  };

  // Initialize room with random participants on component mount
  useEffect(() => {
    const randomParticipants = {};
    const participantCount = Math.floor(Math.random() * 6) + 3; // 3-8 participants

    for (let i = 0; i < participantCount; i++) {
      const tableNum = Math.floor(Math.random() * TOTAL_TABLES) + 1;
      const chairNum = Math.floor(Math.random() * CHAIRS_PER_TABLE) + 1;
      const chairKey = `${tableNum}-${chairNum}`;

      if (!randomParticipants[chairKey]) {
        randomParticipants[chairKey] = {
          name: DEMO_NAMES[Math.floor(Math.random() * DEMO_NAMES.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          isDemo: true,
        };
      }
    }
    setParticipants(randomParticipants);
  }, []);
  
  const participantCount = useMemo(() => Object.keys(participants).length, [participants]);

  const handleSelectChair = (table, chair) => {
    if (currentUser) {
       alert('You are already seated. Please leave your current seat to move.');
       return;
    }
    const chairKey = `${table}-${chair}`;
    if (participants[chairKey]) {
      alert(`This seat is occupied by ${participants[chairKey].name}.`);
      return;
    }
    setSelectedSeat({ table, chair });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setNameInput('');
    setSelectedSeat(null);
  };

  const handleJoinTable = () => {
    if (!nameInput.trim()) {
      alert('Please enter your name.');
      return;
    }

    const newUser = {
      name: nameInput.trim(),
      table: selectedSeat.table,
      chair: selectedSeat.chair,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    const chairKey = `${selectedSeat.table}-${selectedSeat.chair}`;

    setParticipants(prev => ({
      ...prev,
      [chairKey]: { name: newUser.name, color: newUser.color, isDemo: false },
    }));

    setCurrentUser(newUser);
    handleCloseModal();
  };

  const handleLeaveSeat = () => {
    if (!currentUser) return;
    
    const chairKey = `${currentUser.table}-${currentUser.chair}`;
    
    setParticipants(prev => {
        const newParticipants = { ...prev };
        delete newParticipants[chairKey];
        return newParticipants;
    });

    setCurrentUser(null);
    alert('You have left the table.');
  };

  const tables = [...Array(TOTAL_TABLES)].map((_, i) => i + 1);
  const chairs = [...Array(CHAIRS_PER_TABLE)].map((_, i) => i + 1);

  return (
    <Box maxWidth={'xl'}>
      {/* --- Classroom --- */}
      <Box sx={{ p: { xs: '20px', md: '20px 20px' }, height: 'fit-content', }}>
        {/* Tables Container */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '100px',
            justifyItems: 'center',
            my: '40px',
            width: 'fit-content',
            height: 'fit-content',
          }}
        >
          {tables.map(tableNum => (
            <Box key={tableNum} sx={{ position: 'relative', width: '200px', height: '200px' }}>
              {/* Table Surface */}
              <Box
                sx={{
                  width: '160px',
                  height: '160px',
                  background: 'linear-gradient(145deg, #8b4513, #6b3410)',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 2px 10px rgba(255, 255, 255, 0.2)',
                  border: '4px solid #5a2d0c',
                }}
              />
              <Typography
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  zIndex: 10,
                }}
              >
                {tableNum}
              </Typography>

              {/* Chairs */}
              {chairs.map(chairNum => {
                const chairKey = `${tableNum}-${chairNum}`;
                const participant = participants[chairKey];
                const isOccupied = !!participant;

                const chairPositions = {
                  1: { top: -25, left: '50%', transform: 'translateX(-50%)' },
                  2: { right: -25, top: '50%', transform: 'translateY(-50%)' },
                  3: { bottom: -25, left: '50%', transform: 'translateX(-50%)' },
                  4: { left: -25, top: '50%', transform: 'translateY(-50%)' },
                };

                return (
                  <Box
                    key={chairKey}
                    title={isOccupied ? participant.name : 'Join this seat'}
                    onClick={() => handleSelectChair(tableNum, chairNum)}
                    sx={{
                      position: 'absolute',
                      width: '50px',
                      height: '50px',
                      background: isOccupied
                        ? 'linear-gradient(145deg, #e53e3e, #c53030)'
                        : 'linear-gradient(145deg, #4a5568, #2d3748)',
                      borderColor: isOccupied ? '#9b2c2c' : '#1a202c',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: '3px solid',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 2px 5px rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...chairPositions[chairNum],
                      '&:hover': {
                        transform: isOccupied
                          ? `${chairPositions[chairNum].transform} scale(1.05)`
                          : `${chairPositions[chairNum].transform} scale(1.15)`,
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(102, 126, 234, 0.4)',
                        background: isOccupied
                          ? 'linear-gradient(145deg, #fc8181, #e53e3e)'
                          : 'linear-gradient(145deg, #667eea, #764ba2)',
                      },
                    }}
                  >
                    {isOccupied && (
                      <Box
                        sx={{
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          background: participant.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '14px',
                          color: 'white',
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        {participant.name.charAt(0).toUpperCase()}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>

      {/* --- Floating Controls & Chat --- */}
      {currentUser && (
        <>
          <Stack
            spacing={2}
            sx={{ position: 'fixed', bottom: { xs: 20, md: 30 }, right: { xs: 20, md: 30 }, zIndex: 50 }}
          >
            <Fab
              color={isMuted ? 'secondary' : 'primary'}
              aria-label="mute"
              onClick={() => setMuted(!isMuted)}
              sx={{
                background: isMuted
                  ? 'linear-gradient(45deg, #e53e3e, #c53030)'
                  : 'linear-gradient(45deg, #48bb78, #38a169)',
                '&:hover': {
                  transform: 'scale(1.1)',
                  background: isMuted
                    ? 'linear-gradient(45deg, #fc8181, #e53e3e)'
                    : 'linear-gradient(45deg, #68d391, #48bb78)',
                },
              }}
            >
              {isMuted ? <MicOffIcon /> : <MicIcon />}
            </Fab>
            <Fab
              aria-label="chat"
              color="primary"
              onClick={() => setChatOpen(true)}
              sx={{ background: 'linear-gradient(45deg, #4aa72c, #2196f3)' }}
            >
              <ChatIcon />
            </Fab>
            <Fab
              aria-label="leave"
              onClick={handleLeaveSeat}
              sx={{
                background: 'linear-gradient(45deg, #ed8936, #dd6b20)',
                color: 'white',
                '&:hover': {
                  transform: 'scale(1.1)',
                  background: 'linear-gradient(45deg, #f6ad55, #ed8936)',
                },
              }}
            >
              <CallEndIcon />
            </Fab>
          </Stack>

          {/* Floating Chat Drawer */}
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              width: { xs: '100vw', sm: 360 },
              maxWidth: 360,
              bgcolor: 'background.paper',
              boxShadow: 8,
              borderTopLeftRadius: 16,
              borderTopRightRadius: { xs: 0, sm: 16 },
              zIndex: 1200,
              display: chatOpen ? 'flex' : 'none',
              flexDirection: 'column',
              height: { xs: 320, sm: 400 },
              p: 0,
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2, borderBottom: '1px solid #eee' }}>
              <Typography fontWeight={600} color="primary">Group Chat</Typography>
              <IconButton size="small" onClick={() => setChatOpen(false)}><CloseIcon /></IconButton>
            </Stack>
            <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 1 }}>
              {chatMessages.map((msg, i) => (
                <Box key={i} sx={{ mb: 1, textAlign: msg.sender === currentUser?.name ? 'right' : 'left' }}>
                  <Typography variant="caption" color="text.secondary">
                    {msg.sender}
                  </Typography>
                  <Box sx={{
                    display: 'inline-block',
                    bgcolor: msg.sender === currentUser?.name ? '#e0ffe0' : '#f0f0f0',
                    color: '#333',
                    px: 1.5, py: 0.5, borderRadius: 2, fontSize: 14, mt: 0.5
                  }}>{msg.text}</Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ p: 2, borderTop: '1px solid #eee', display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                placeholder="Type a message..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSendChat(); }}
                fullWidth
              />
              <Button variant="contained" onClick={handleSendChat} sx={{ minWidth: 0, px: 2 }}>Send</Button>
            </Box>
          </Box>
        </>
      )}

      {/* --- Join Modal --- */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card sx={{ p: 2, borderRadius: '15px', maxWidth: 400, width: '90%', outline: 'none' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="h3" mb={2.5}>
              Bergabung ke Meja {selectedSeat?.table}
            </Typography>
            <TextField
              fullWidth
              autoFocus
              label="Masukkan nama Anda"
              variant="outlined"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleJoinTable()}
              sx={{ mb: 2.5 }}
            />
            <Stack direction="row" spacing={1.5}>
              <Button variant="outlined" fullWidth onClick={handleCloseModal}>
                Batal
              </Button>
              <Button variant="contained" fullWidth onClick={handleJoinTable}>
                Gabung
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Modal>

      {/* Add a button to leave the entire meeting */}
      <Button 
        variant='contained' 
        color='error' 
        onClick={onLeave} 
        sx={{position: 'fixed', top: 80, right: 20}}
      >
        Leave Meeting Room
      </Button>
    </Box>
  );
};


// --- Main Page Component ---
const VoraSpacePage = () => {
  const [inMeeting, setInMeeting] = useState(false);
  const [meetingCode, setMeetingCode] = useState('');

  const handleJoin = () => {
    // In a real app, you would validate the meeting code
    if (meetingCode || meetingCode === '') { // Allow creating a new meeting without code
      setInMeeting(true);
    }
  };

  return (
    <Box
      sx={{
        height: 'fit-content',
        width: '100%',
        color: '#333',
        overflowX: 'hidden',
      }}
    >
        <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      {!inMeeting ? (
        <Box sx={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'start',
          height: 'fit-content',
          overflowY: ismobile => ismobile ? 'auto' : 'hidden',
          p: { xs: 2, md: 4 }
        }}>
          <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 3, boxShadow: 3}}>
            <CardContent>
              <Typography variant="h4" fontWeight={700} color="primary" align="center" gutterBottom>
                VoraSpace
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" align="center" mb={3}>
                Join or create a new meeting to start a voice chat session.
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Enter Meeting Code (optional)"
                  variant="outlined"
                  value={meetingCode}
                  onChange={e => setMeetingCode(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleJoin}
                >
                  {meetingCode ? 'Join Meeting' : 'Create New Meeting'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <MeetingRoom onLeave={() => setInMeeting(false)} />
      )}
    </Box>
  );
};

export default VoraSpacePage;