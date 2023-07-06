module.exports = {
    // ... other webpack config options
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        // ... other rules
      ],
    },
  };
  