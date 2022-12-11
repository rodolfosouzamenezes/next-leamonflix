import Image from 'next/image';

interface IProps {
    closeModal: () => void,
    movie: any
}

const MovieDetail:React.FC<IProps> = ({closeModal, movie}) => {
    return (
        <div className='fullScreen'>
            <div className='detailContent'>
                <figure className="movieBanner">
                    <Image
                        src={movie.banner}
                        className='bannerCover'
                        alt='bird-box'
                        width={1200}
                        height={400}
                    />
                </figure>
                <button onClick={closeModal} type="button" className="buttonClose">X</button>

                <div className='resumeMovie'>
                    <h1 className='movieDetail'>{movie.title}</h1>
                    <div className='synopsis'>{movie.description}</div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail;