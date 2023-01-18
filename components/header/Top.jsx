import { useSelector } from 'react-redux';
import SignInSighOut from '../inputs/login-btn';

export default function Top() {
  const { cart } = useSelector((state) => ({ ...state }));
  return (
    <div>
      <ul>
        <li>
          <span>Cart</span> <span>{cart.length}</span>
        </li>
        <li>
          <SignInSighOut />
        </li>
      </ul>
    </div>
  );
}
