import { sendRequest } from "@/utils/API";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import ProfileCard from "@/components/header/ProfileCard";

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
	const res = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
		url: "http://localhost:8000/api/v1/tracks/users?current=1&pageSize=10",
		method: "POST",
		body: { id: params.slug },
	});

	return (
		<Container sx={{my: 5}}>
			<Box sx={{ width: "100%" }}>
				<Grid
					container
					rowSpacing={3}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				>
					{res &&
						res.data &&
						res.data.result.map((item: ITrackTop) => {
							return (
								<Grid key={item._id} item xs={12} md={6}>
									<ProfileCard data={item}/>
								</Grid>
							);
						})}
				</Grid>
			</Box>
		</Container>
	);
};

export default ProfilePage;
