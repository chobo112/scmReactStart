import styled from 'styled-components';
export const ButtonContainer = styled.div`
    display: unset;
    text-align: right;
`;

export const ButtonStyled = styled.button<{
    width: number | undefined;
    height: number | undefined;
    padding: number | undefined;
    paddingtop: number | undefined;
    paddingbottom: number | undefined;
    paddingleft: number | undefined;
    paddingright: number | undefined;
    fontSize: number | undefined;
}>`
    background-color: #3bb2ea;
    width: ${({ width }) => (width !== undefined ? `${width}px` : 'unset')};
    height: ${({ height }) => (height !== undefined ? `${height}px` : 'unset')};
    border: none;
    color: white;
    padding: ${({ padding }) => (padding !== undefined ? `${padding}px` : '50px')};
    padding-top: ${({ paddingtop }) => (paddingtop !== undefined ? `${paddingtop}px` : '15px')};
    padding-bottom: ${({ paddingbottom }) => (paddingbottom !== undefined ? `${paddingbottom}px` : '15px')};
    padding-left: ${({ paddingleft }) => (paddingleft !== undefined ? `${paddingleft}px` : '10px')};
    padding-right: ${({ paddingright }) => (paddingright !== undefined ? `${paddingright}px` : '10px')};
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: ${({ fontSize }) => (fontSize !== undefined ? `${fontSize}px` : '16px')};
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
`;
