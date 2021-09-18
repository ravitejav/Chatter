import './Spinner.css';

export const Spinner = () => {

    const loadingText = ['L','O','A','D','I','N','G','.','.','.','!'];

    const styleVar = (i: number) => {
        return {
            '--i': i
        } as React.CSSProperties;
    }

    return (
        <div className="spinnerWrapper center">
            <p className="loader">
                {loadingText.map((text: string, i: number) => (
                    <span style={styleVar(i)}>{text}</span>
                ))}
            </p>
        </div>
    );
}