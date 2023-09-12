export const buildSvgLoader = () => ({
    test: /\.svg$/,
    use: [{
        loader: '@svgr/webpack',
        options: {
            icon: true,
            svgoConfig: {
                plugins: [
                    {
                        name: 'convertColors',
                        params: {
                            currentColor: true,
                        },
                    },
                ],
            },
        },
    }],
});
