import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

// Navigation
import PublicDrawer from "../../layouts/components/PublicDrawer";
import PublicNavBottom from "../../layouts/components/PublicNavBottom";

import ProgramTypeCard from "../../features/programs/components/ProgramTypeCard";
import axios from "axios";

interface Program {
  id: string;
  name: string;
  ageRange: string;
  image: string;
  description: string;
  link: string;
}

function PublicPrograms() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [programTypes, setProgramTypes] = useState<any>([]);
  const [isBusy, setBusy] = useState(true);

  const queryProgramTypes = async () => {
    try {
      // Get all program types
      axios(import.meta.env.VITE_APP_BACKEND_URL + "/programs/type").then(
        (response) => {
          console.log(response.data);
          setProgramTypes(response.data);
        }
      );
      setBusy(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    queryProgramTypes();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <PublicDrawer page="Programs" />
      <PublicNavBottom page="Programs" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 15 }}>
          {isBusy ? (
            <Box textAlign="center" mt={10}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography variant="h1_home">Programs</Typography>
              <Stack
                mt={6}
                direction="row"
                flexWrap="wrap"
                justifyContent={{ xs: "center", md: "left" }}
                spacing={0}
                sx={{ gap: 1 }}
              >
                {programTypes.map((program: Program) => (
                  <ProgramTypeCard
                    key={program.id}
                    title={program.name}
                    subtitle={program.ageRange}
                    image={program.image}
                    description={program.description}
                    link={program.link}
                  />
                ))}
              </Stack>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default PublicPrograms;
