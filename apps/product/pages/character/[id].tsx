import Card from 'apps/product/components/card/Card';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: lightgray;
`;



export default function Character({ data }) {

  
  const { id, name, status, species, gender, image, created, origin, location} = data
  
  return (
    <Container>
        <Card id={id}
                name={name}
                status={status}
                species={species}
                gender={gender}
                imageUrl={image}
                created={created}
                origin={origin}
                location={location} />
    </Container>
  );
}

export async function getStaticPaths() {
    const characters = await fetch(
        `https://rickandmortyapi.com/api/character/`
    );

    const data = await characters.json();

    const paths = data.results.map((char) => ({
        params: { id: char.id.toString() }
    }))

    // fallback: false means pages that don’t have the
    // correct id will 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );
  const data = await res.json();
  if (!data) {
    return <p>Loading...</p>;
  }
  // Pass data to the page via props
  return {
    props: {
      data: data,
    },
  };
}
