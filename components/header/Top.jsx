import { MdSecurity } from 'react-icons/md';
import { BsSuitHeart } from 'react-icons/bs';
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import SighInSighOut from '../inputs/login-btn';
import styles from './styles.module.scss';

export default function Top() {
  const { cart } = useSelector((state) => ({ ...state }));
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li>
            <span>USA / USD</span>
          </li>
          <li>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li>
            <span>Help</span>
          </li>
          <li>
            <BsSuitHeart />
            <span>Wishlist</span>
          </li>
          <li>
            <div className={styles.flex}>
              <RiAccountPinCircleLine />
              <span>Account</span>
              <RiArrowDropDownFill />
            </div>
          </li>
          <li>
            <span>Cart</span> <span>{cart.length}</span>
          </li>
          <li>
            <SighInSighOut />
          </li>
        </ul>
      </div>
    </div>
  );
}
