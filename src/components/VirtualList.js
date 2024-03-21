import React, { useEffect, useRef, useState } from 'react';

function VirtualList({ itemList, containerHeight, containerWidth, rowHeight, renderItem }) {
    const containerRef = useRef(null);
    const [visibleItems, setVisibleItems] = useState([]);
    const [startItem, setStartItem] = useState([]);

    useEffect(() => {
        const container = containerRef.current;
        const handleScroll = () => {
            const { scrollTop } = container;
            const startItem = Math.floor(scrollTop / rowHeight);
            setStartItem(startItem);
            const endItem = startItem + Math.floor(containerHeight / rowHeight) + 5;

            setVisibleItems(itemList.slice(startItem, endItem + 1));
        };

        container.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => container.removeEventListener('scroll', handleScroll);
    }, [containerHeight, itemList, rowHeight]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                height: `${containerHeight}px`,
                width: `${containerWidth}px`,
                overflowY: 'auto',
                marginTop: '64px'
            }}
        >
            <ul style={{ position: 'relative', height: `${itemList.length * rowHeight}px` }}>
                {visibleItems.map((item, index) => (
                    <li
                        key={index}
                        style={{
                            position: 'absolute',
                            height: `${rowHeight}px`,
                            width: '100%',
                            top: `${(startItem + index) * rowHeight}px`,
                        }}
                    >
                        {renderItem(item)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default VirtualList