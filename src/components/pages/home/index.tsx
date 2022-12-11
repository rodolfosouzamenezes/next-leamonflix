import Image from 'next/image';
import MovieDetail from '../../shared/MovieDetail';
import useModal from '../../../hooks/useModal';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/axios';

interface Movie {
  id: string;
  title: string;
  url: string;
}

interface MovieDetails {
  movieDetails: {
    image: string;
    title: string;
    banner: string;
    description: string;
  }
}

interface AllMovies {
  movies: Movie[];
}

const Home = () => {
  const [isOpenModal, openModal, closeModal] = useModal();
  const [movieShow, setMovie] = useState(undefined);
  const [movies, setMovies] = useState<Movie[]>()

  const getAllMovies = async () => {
    try {
      const response = await api.get<AllMovies>('/')

      const { movies } = response.data;

      setMovies(movies)
    } catch (error) {
      console.log(error.message);
    }
  }

  const getMovie = async (id: string) => {
    try {
      const response = await api.get<MovieDetails>(`/${id}`)

      console.log(response.data.movieDetails)
      setMovie(response.data.movieDetails)

    } catch (error) {
      console.log(error.message);
    }
  }

  if (!movies) {
    getAllMovies()
  }


  const handleOpenModal = (movieId: string) => {

    getMovie(movieId);
    openModal();
  }

  return (
    <>
      <header>
        <div className='topHeader'>
          <Image src={'https://iili.io/HKhZB5P.png'} className='logo' alt='leamonFlixLogo' width={300} height={20} />
          <ul className='menu'>
            <li><a href="">Filmes</a></li>
          </ul>
        </div>
        <button className='installApp'><b>Instalar App</b></button>
      </header>

      {isOpenModal && movieShow && <MovieDetail closeModal={closeModal} movie={movieShow} />}

      <div className='middle'>
        <div className='social'>
          <a href="https://www.facebook.com/Leamonflix-100364005409456" target="_blank" rel="noreferrer">
            <Image src={'https://iili.io/HKhQm57.png'} className='icons' alt='facebook' width={70} height={70} />
          </a>
          <a href="https://www.instagram.com/leamonflix/" target="_blank" rel="noreferrer">
            <Image src={'https://iili.io/HKhZqdB.png'} className='icons' alt='instagram' width={70} height={70} />
          </a>
          <a href="https://github.com/IsacChuab/leamonflix-front" target="_blank" rel="noreferrer">
            <Image src={'https://iili.io/HKhQybe.png'} className='icons' alt='github' width={70} height={70} />
          </a>
        </div>

        <div className='content'>
          <h3 className='titleTop'>Top melhores filmes NETFLIX</h3>
          <div className='movieContent'>
            {movies && movies.map((movie, i) => {
              return (
                <figure className="listMovies" key={i}>
                  <Image
                    src={movie.url}
                    title={movie.title}
                    className='movieCover'
                    alt='bird-box'
                    width={200}
                    height={300}
                    onClick={(e) => handleOpenModal(movie.id)}
                  />
                </figure>
              )
            })}
          </div>
        </div>
      </div>

      <div className='foot'>
        <h5 className='producedBy'>Desenvolvido por: <u><i>Rodolfo Souza Menezes</i></u></h5>
        <div className='buttonsFoot'>
          <button className='installApp'><b>Instalar App</b></button>
          <button className='feedback'><b>Feedback</b></button>
        </div>
      </div>
    </>
  )
}

export default Home;
