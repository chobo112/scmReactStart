import { NotFoundStyled } from './styled';
import not_found from '../../../assets/not_found.jpg';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <NotFoundStyled>
            <div className="img-box">
                <img src={not_found} alt="notFound"></img>
            </div>
            <Button width={150} height={50} fontSize={20} onClick={() => navigate(-1)}>
                뒤로가기
            </Button>
        </NotFoundStyled>
    );
};
