import type { Metadata } from 'next'
import Container from '@mui/material/Container';
import ClientSearch from '@/components/header/ClientSearch';

export const metadata: Metadata = {
    title: 'Search your tracks',
    description: 'search something',
}

const SearchPage = () => {
    return (
        <Container sx={{ mt: 3 }}>
            <ClientSearch />
        </Container>
    )
}

export default SearchPage;
