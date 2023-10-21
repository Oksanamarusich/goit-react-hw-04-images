import { RotatingLines } from 'react-loader-spinner';
import {ContainerLoader} from './Loader.styled'

export const Loader = () => {
    return <ContainerLoader>
        <RotatingLines
           strokeColor="grey"
           strokeWidth="5"
           animationDuration="0.75"
           width="96"
           visible={true}
          />
    </ContainerLoader>
}