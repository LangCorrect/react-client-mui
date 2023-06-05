import BootstrapContainer from "../components/BootstrapContainer";
import { Typography, Grid, Button, Box, Tabs, Tab } from "@mui/material";
import { Stars, Mail } from '@mui/icons-material';
import { useState } from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const ProfileDetailPage = () => {
    const tabProps = (index: number) => ({
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    })

    const TabPanel = (props: TabPanelProps) => {
        const { children, value, index } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    const [tabValue, setTabValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <>
            <BootstrapContainer>
                <Grid
                    container
                >
                    <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }} paddingRight={3}>
                        <Typography
                            variant="h3"
                            color="primary"
                            display={{ xs: "none", md: "block" }}
                        >
                            Reynaud Reyer
                        </Typography>
                        <Box>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={tabValue} onChange={handleChange} aria-label="profile tabs">
                                    <Tab label="Posts" {...tabProps(0)} />
                                    <Tab label="Prompts" {...tabProps(1)} />
                                    <Tab label="Stats" {...tabProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={tabValue} index={0}>
                                Display my posts
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                Display my prompts
                            </TabPanel>
                            <TabPanel value={tabValue} index={2}>
                                Display my stats
                            </TabPanel>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3} order={{ xs: 1, md: 2 }} borderLeft={{ xs: 0, md: "1px solid lightgrey" }} sx={{ paddingLeft: { xs: 0, md: 3 } }}>
                        <Grid container marginBottom={1}>
                            <Grid item xs={4} md={12} container alignItems="center" justifyContent="start" marginBottom={1}>
                                <Box
                                    component="img"
                                    src="https://thumb9.shutterstock.com/image-photo/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-250nw-1714666150.jpg"
                                    alt="profile-pic"
                                    sx={{ width: { xs: 100, md: 150 }, height: { xs: 100, md: 150 }, objectFit: "cover", borderRadius: "50%" }}
                                />
                            </Grid>
                            <Grid item xs={8} md={12} container textAlign="start">
                                <Grid item xs={12} display="flex" alignItems="center" justifyContent="start">
                                    <Typography variant="h5" color="primary">
                                        Reynaud Reyer
                                    </Typography>
                                    <Stars color="primary" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        2 followers
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} textAlign="start">
                                    <Typography variant="subtitle1" color="text.secondary" display={{ xs: "none", md: "block" }}>
                                        I'm from Nantes, France and I'm learning English
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Box display="flex" gap={1} justifyContent="start">
                            <Button size="small" variant="contained">Follow</Button>
                            <Button size="small" variant="contained"><Mail /></Button>
                        </Box>
                    </Grid>
                </Grid>
            </BootstrapContainer >
        </>
    )
}

export default ProfileDetailPage