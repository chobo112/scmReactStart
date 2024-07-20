import { useParams } from 'react-router-dom';

export const ComnCodMgrDetailMain = () => {
    // const grpCod = useParams();
    // console.log(grpCod);
    const { grpCod } = useParams();
    return <>{grpCod}</>;
};
