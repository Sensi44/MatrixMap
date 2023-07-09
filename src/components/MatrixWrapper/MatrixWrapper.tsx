import React, { useState, useEffect } from 'react';

import { checkCurrent } from '../../utils/checkCurrent';
import Component1 from '../Component1/Component1.tsx';
import Component2 from '../Component2/Component2.tsx';
import Component3 from '../Component3/Component3.tsx';
import Component4 from '../Component4/Component4.tsx';
import './styles.scss';
import './animations.scss';

const initMatrix = [
  [
    null,
    <Component1 key={'1:2'} />,
    <Component1 key={'1:3'} />,
    <Component3 key={'1:4'} />,
    null,
    null,
  ], // строка с содержимым столба
  [
    null,
    null,
    <Component2 key={'2:3'} />,
    <Component3 key={'2:4'} />,
    null,
    null,
  ], // строка с содержимым столба
  [
    null,
    <Component3 key={'3:2'} />,
    <Component4 key={'3:3'} />,
    null,
    null,
    null,
  ], // строка с содержимым столба
  [
    <Component3 key={'4:1'} />,
    <Component3 key={'4:2'} />,
    <Component1 key={'4:3'} />,
    <Component2 key={'4:4'} />,
    <Component2 key={'4:5'} />,
    <Component3 key={'4:6'} />,
  ], // строка с содержимым столба
  [
    null,
    <Component1 key={'5:2'} />,
    <Component2 key={'5:3'} />,
    null,
    <Component3 key={'5:5'} />,
    <Component3 key={'5:6'} />,
  ], // строка с содержимым столба
];

const MatrixWrapper = () => {
  const [matrix, setMatrix] = useState(initMatrix);
  const [currentItem, setCurrentItem] = useState([2, 2]);
  const [prevItem, setPrevItem] = useState(
    matrix[currentItem[0]][currentItem[1]]
  );
  const [nextItemComp, setNextItemComp] = useState(null);
  const [direction, setDirection] = useState('');

  const getCurrent = () => {
    return matrix[currentItem[0]][currentItem[1]];
  };
  // console.log(currentItem, matrix[1].length);

  const matrixElements = matrix.map((item, strokeIndex) => {
    return (
      <div className={'stroke'} key={strokeIndex}>
        {item.map((columnItem, columnIndex) => {
          if (columnItem === null) {
            return (
              <div className={'matrix-item__container empty'} key={columnIndex}>
                {null}
              </div>
            );
          }

          return (
            <div
              className={`matrix-item__container ${
                checkCurrent(strokeIndex, columnIndex, currentItem)
                  ? 'current'
                  : ''
              }`}
              key={columnIndex}
            >
              {columnItem.key}
            </div>
          );
        })}
      </div>
    );
  });

  const checkDisabled = (directionStr) => {
    const [rowIndex, colIndex] = currentItem;

    switch (directionStr) {
      case 'top':
        return colIndex === 0 || matrix[rowIndex][colIndex - 1] === null;
      case 'right':
        return (
          rowIndex === matrix.length - 1 ||
          matrix[rowIndex + 1][colIndex] === null
        );
      case 'left':
        return rowIndex === 0 || matrix[rowIndex - 1][colIndex] === null;
      case 'bottom':
        return (
          colIndex === matrix[rowIndex].length - 1 ||
          matrix[rowIndex][colIndex + 1] === null
        );
      default:
        return false;
    }
  };

  const handleRight = () => {
    if (currentItem[0] < matrix.length - 1) {
      const nextItem = matrix[currentItem[0] + 1][currentItem[1]];
      if (nextItem !== null) {
        setDirection('right');
        setCurrentItem([currentItem[0] + 1, currentItem[1]]);

        setPrevItem(getCurrent());
        setNextItemComp(matrix[currentItem[0] + 1][currentItem[1]]);
      }
    }
  };

  const handleLeft = () => {
    if (currentItem[0] > 0) {
      const nextItem = matrix[currentItem[0] - 1][currentItem[1]];
      if (nextItem !== null) {
        setDirection('left');
        setCurrentItem([currentItem[0] - 1, currentItem[1]]);

        setPrevItem(getCurrent());
        setNextItemComp(matrix[currentItem[0] - 1][currentItem[1]]);
      }
    }
  };

  const handleTop = () => {
    if (currentItem[1] > 0) {
      const nextItem = matrix[currentItem[0]][currentItem[1] - 1];
      if (nextItem !== null) {
        setDirection('top');
        setCurrentItem([currentItem[0], currentItem[1] - 1]);

        setPrevItem(getCurrent());
        setNextItemComp(matrix[currentItem[0]][currentItem[1] - 1]);
      }
    }
  };

  const handleBottom = () => {
    if (currentItem[1] < matrix[currentItem[0]].length - 1) {
      const nextItem = matrix[currentItem[0]][currentItem[1] + 1];
      if (nextItem !== null) {
        setDirection('bottom');
        setCurrentItem([currentItem[0], currentItem[1] + 1]);

        setPrevItem(getCurrent());
        setNextItemComp(matrix[currentItem[0]][currentItem[1] + 1]);
      }
    }
  };

  const handleKeyDown = (event) => {
    console.log(event.key);
    switch (event.key) {
      case 'ArrowUp':
        handleTop();
        break;
      case 'ArrowRight':
        handleRight();
        break;
      case 'ArrowDown':
        handleBottom();
        break;
      case 'ArrowLeft':
        handleLeft();
        break;
      default:
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentItem]);

  return (
    <>
      <div className='matrix-map'>{matrixElements}</div>

      {nextItemComp !== null ? (
        <div className={`currentComponent ${direction}`}>
          {prevItem}
          {nextItemComp}
        </div>
      ) : (
        <div className='start-component'>{prevItem}</div>
      )}

      <div className='matrix-controls'>
        <button disabled={checkDisabled('left')} onClick={handleLeft}>
          ←
        </button>
        <button disabled={checkDisabled('top')} onClick={handleTop}>
          ↑
        </button>
        <button disabled={checkDisabled('right')} onClick={handleRight}>
          →
        </button>
        <button disabled={checkDisabled('bottom')} onClick={handleBottom}>
          ↓
        </button>
      </div>
    </>
  );
};

export default MatrixWrapper;
