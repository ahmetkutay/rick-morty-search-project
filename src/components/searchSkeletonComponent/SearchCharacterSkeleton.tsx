import React from 'react';
import ContentLoader from 'react-content-loader';

interface SearchCharacterSkeletonProps {
    length: number;
    speed: number;
    height: number;
    viewBox: string;
    backgroundColor: string;
    foregroundColor: string;
}

interface RectProps {
    x: string;
    y: string;
    rx: string;
    ry: string;
    width: string;
    height: string;
}

const Rect: React.FC<RectProps> = ({ x, y, rx, ry, width, height }) => (
    <rect x={x} y={y} rx={rx} ry={ry} width={width} height={height} />
);

const SearchCharacterSkeleton: React.FC<SearchCharacterSkeletonProps> = React.memo(({
    length = 10,
    speed = 2,
    height = 80,
    viewBox = "0 0 400 80",
    backgroundColor = "#ccc",
    foregroundColor = "#aba"
}) => (
    <div>
        {Array.from({ length }).map((_, index) => (
            <div key={index} style={{ paddingBottom: '10px' }}>
                <ContentLoader
                    speed={speed}
                    height={height}
                    viewBox={viewBox}
                    backgroundColor={backgroundColor}
                    foregroundColor={foregroundColor}
                >
                    <Rect x="0" y="0" rx="5" ry="5" width="80" height="80" />
                    <Rect x="100" y="10" rx="5" ry="5" width="200" height="20" />
                    <Rect x="100" y="40" rx="5" ry="5" width="150" height="20" />
                </ContentLoader>
            </div>
        ))}
    </div>
));

SearchCharacterSkeleton.displayName = 'SearchCharacterSkeleton';

export default SearchCharacterSkeleton;