import { FeedInfo, OrdersList } from '@components';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';
import { FC, memo } from 'react';
import styles from './feed.module.css';
import { FeedUIProps } from './type';

export const FeedUI: FC<FeedUIProps> = memo(({ orders, handleGetFeeds }) => {
  if (!orders || orders.length === 0) {
    return (
      <main className={styles.containerMain}>
        <div className={`${styles.titleBox} mt-10 mb-5`}>
          <h1 className={`${styles.title} text text_type_main-large`}>
            Лента заказов
          </h1>
          <RefreshButton
            text='Обновить'
            onClick={handleGetFeeds}
            extraClass={'ml-30'}
          />
        </div>
        <div className={styles.main}>
          <div className={styles.columnOrders}>
            <p className='text text_type_main-medium'>
              Нет заказов для отображения
            </p>
          </div>
          <div className={styles.columnInfo}>
            <FeedInfo />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.containerMain}>
      <div className={`${styles.titleBox} mt-10 mb-5`}>
        <h1 className={`${styles.title} text text_type_main-large`}>
          Лента заказов
        </h1>
        <RefreshButton
          text='Обновить'
          onClick={handleGetFeeds}
          extraClass={'ml-30'}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.columnOrders}>
          <OrdersList orders={orders} />
        </div>
        <div className={styles.columnInfo}>
          <FeedInfo />
        </div>
      </div>
    </main>
  );
});
