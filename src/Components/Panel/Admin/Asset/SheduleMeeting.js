import React, { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
    Stack,
    Chip,
    MenuItem,
    Select
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';
import Header from "../../../Shared/Navbar/Navbar";

const ScheduleCall = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeZone, setTimeZone] = useState('Asia/Kolkata');
    const [showTimeZoneDialog, setShowTimeZoneDialog] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('+91 9133121164');
    const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);


    const timeSlots = ['09:00', '11:00', '11:30', '14:00', '15:00'];

    const timeZones = [
        { value: 'Asia/Kolkata', label: 'Indian Standard Time (GMT+5:30)', abbr: 'IST' },
        { value: 'America/Los_Angeles', label: 'Pacific Standard Time (GMT-8:00)', abbr: 'PST' },
        { value: 'America/New_York', label: 'Eastern Standard Time (GMT-5:00)', abbr: 'EST' },
        { value: 'Europe/Berlin', label: 'Central European Time (GMT+1:00)', abbr: 'CET' },
    ];


    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleConfirmClick = () => {
        if (selectedDate && selectedTime) {
            setOpenDialog(true);
        }
    };

    const handleTimeZoneChange = (newZone) => {
        setTimeZone(newZone);
        setShowTimeZoneDialog(false);
    };

    const formatTimeSlot = (time) => {
        if (!time) return ''; // early return to avoid null error
        try {
            return DateTime.fromFormat(time, 'HH:mm', { zone: timeZone }).toFormat('hh:mm a');
        } catch (err) {
            console.error("Invalid time format:", time, err);
            return '';
        }
    };    

    return (
        <>
        <Header/>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en">
            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Schedule Call
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <Typography variant="subtitle1">
                        {timeZones.find(tz => tz.value === timeZone)?.label}
                    </Typography>
                    <Button
                        variant="text"
                        size="small"
                        onClick={() => setShowTimeZoneDialog(true)}
                    >
                        CHANGE
                    </Button>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ my: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Select Date
                    </Typography>
                    <DatePicker
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        timezone={timeZone}
                        sx={{ width: '100%' }}
                    />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ my: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Available Time Slots
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {timeSlots.map((time) => {
                            const slotTime = DateTime.fromFormat(time, 'HH:mm', { zone: timeZone });
                            return (
                                <Chip
                                    key={time}
                                    label={slotTime.toFormat('hh:mm a')}
                                    onClick={() => handleTimeSelect(time)}
                                    variant={selectedTime === time ? 'filled' : 'outlined'}
                                    color="primary"
                                    sx={{ mb: 1 }}
                                />
                            );
                        })}
                    </Stack>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mt: 4 }}>
                    <Typography variant="body1" gutterBottom>
                        {editingPhoneNumber ? (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        fontSize: '16px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => setEditingPhoneNumber(false)}
                                >
                                    Save
                                </Button>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body1">
                                    Our representative will call you on {phoneNumber} ✓
                                </Typography>
                                <Button
                                    variant="text"
                                    size="small"
                                    onClick={() => setEditingPhoneNumber(true)}
                                >
                                    Edit
                                </Button>
                            </Box>
                        )}
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleConfirmClick}
                        sx={{ mt: 2 }}
                        disabled={!selectedDate || !selectedTime}
                    >
                        Confirm
                    </Button>
                </Box>


                <Dialog open={showTimeZoneDialog} onClose={() => setShowTimeZoneDialog(false)} fullWidth maxWidth="xs">
                    <DialogTitle sx={{ fontWeight: 600 }}>Select Timezone</DialogTitle>
                    <DialogContent dividers sx={{ maxHeight: 400, p: 0 }}>
                        <Box sx={{ overflowY: 'auto' }}>
                            {timeZones.map((tz) => (
                                <Box
                                    key={tz.value}
                                    onClick={() => handleTimeZoneChange(tz.value)}
                                    sx={{
                                        cursor: 'pointer',
                                        px: 2,
                                        py: 2,
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: tz.value === timeZone ? '#f0f4ff' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        }
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{ fontWeight: tz.value === timeZone ? 600 : 400, color: '#3f51b5' }}>
                                        {tz.label}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {tz.value.split('/')[1]?.replace('_', ' ')} {/* Optional: shows location */}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowTimeZoneDialog(false)}>Close</Button>
                    </DialogActions>
                </Dialog>


                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
                    <Box sx={{ textAlign: 'center', p: 4 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                mx: 'auto',
                                mb: 2,
                                backgroundColor: '#4CAF50',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="h4" sx={{ color: '#fff' }}>✓</Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                            Meeting Scheduled!
                        </Typography>
                        <Typography sx={{ mb: 3 }}>
                        Your call has been scheduled for <strong>{selectedDate?.setZone(timeZone).toFormat('EEEE, dd-LLL')}</strong> at <strong>{formatTimeSlot(selectedTime)}</strong>.
                        </Typography>

                        <Box
                            sx={{
                                backgroundColor: '#f5f7ff',
                                borderRadius: 2,
                                p: 2,
                                mb: 3,
                                border: '1px solid #e0e0e0',
                            }}
                        >
                            <Typography variant="body2" color="textSecondary">
                                Our representative will call you on:
                            </Typography>
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {phoneNumber}
                                <Typography component="span" color="success.main" fontWeight="bold">✓</Typography>
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                            <Button
                                variant="outlined"
                                color="error"
                                fullWidth
                                onClick={() => setOpenDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => {
                                    setOpenDialog(false);
                                    // Add your submission logic here
                                }}
                            >
                                Confirm
                            </Button>
                        </Box>
                    </Box>
                </Dialog>

            </Container>
        </LocalizationProvider>
        </>
    );
};

export default ScheduleCall;