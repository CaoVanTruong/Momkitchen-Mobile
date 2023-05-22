import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const useAppSelector = useSelector((state: RootState) => state);
};
