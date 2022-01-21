const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// export 
module.exports = {
  // parcel index.html
  // 파일을 읽어드리기 시작하는 진입점 설정
  entry : './js/main.js',

  // 결과물(번들)을 반환하는 설정
  output : {
    // path와 filename을 작성하지 않아도 기본적으로 dist라는 폴더에 entry에서 읽어드리기 시작한 파일을 생성해준다.
    // path : path.resolve(__dirname, 'dist'),
    // filename : 'main.js',
    clean : true // clean을 사용하지 않으면 파일들이 누적된다.
  },

  module : {
    rules:[
      {
        test: /\.s?css$/,
        use: [
          // 순서가 중요하다
          'style-loader', // html style 태그 부분에 해석된 부분을 삽입해 준다.
          'css-loader', // javascript 파일에서는 css파일을 해석할 수 없기 때문에 css-loader가 해석을 해준다.
          'postcss-loader', // main.scss 파일에서 postcss-loader 공급 업체 접두사를 적용
          'sass-loader' // main.scss 파일을 해석을 한다. 
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins : [
    new HtmlPlugin({
      template : './index.html'
    }),
    new CopyPlugin({
      patterns : [
        { from : 'static'}
      ]
    })
  ],

  devServer : {
    host : 'localhost'
  }
}