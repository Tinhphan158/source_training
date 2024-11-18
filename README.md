# Hi, We are <a href="https://caresolutions.com.vn/" target="_blank">TSP</a> <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="25px">

## Glad to see you here!
## About Project

In this project, we will create a website belong to training intern for Frontend Team

## Repository

<https://github.com/ThangNgo02/training.git>

## Design 
This is the design for training
<https://www.figma.com/design/vOLs9PA6ZQ4yZVTRM6fjNL/Training?node-id=2-36040&node-type=FRAME&t=4tZwN2JnAYuClDm3-0>

## Postman 
This is the api for training
<...>

## Languages and Frameworks

- Vite
- TypeScript
- SCSS (node-sass)
- React
- Babel
- Tailwind
- Storybook
- ESLint
- Prettier
- Context API
- Ant Design

## Files/Directories

| Path                    | Purpose                                                     |
| ----------------------- | ----------------------------------------------------------- |
| /.eslintrc              | settings for `ESLint`                                       |
| /.stylelintrc.js        | settings for `Stylelint`                                    |
| /.vscode/               | settings for `Visual Studio Code` workspace                 |
| /package.json           | manifest file for Node.js projects                          |
| /tsconfig.json          | settings for `TypeScript`                                   |
| /dist/                  | contains production build codes                             |
| /public/                | root folder that gets served up as our react app.           |
| /src/components/        | contains Atomic Design components                           |
| /src/pages/             | contains pages                                              |
| /src/pages/.../index.tsx| handle logic for page                                       |
| /src/pages/.../view.tsx | handle view for page                                        |
| /src/assets/            | contains images, movies, fonts, icons                       |
| /src/context/           | contains shared store                                       |
| /src/api/               | contains config api                                         |
| /src/env/               | contains config url api, host, CDN                          |
| /src/firebase/          | contains config firebase                                    |
| /src/hooks/             | contains hooks                                              |
| /src/utils/             | contains utils                                              |
| /src/routes/            | contains routes                                             |
| /src/common/            | contains enum, interface                                    |
| /src/index.tsx          | contains root file                                          |
| /src/App.tsx            | contains application page index                             |
| /src/index.scss         | contains shared styles                                      |
---

## Command Line

| Path                    | Purpose                                                     |
| ----------------------- | ----------------------------------------------------------- |
| npm run dev             | start the project                                           |
| npm run build           | build the project                                           |
| npm run test            | run unit test                                               |
| npm run storybook       | run the storybook                                           |
| npm run lint:script     | run `Eslint` to check the syntax                            |
---

### `Abem`
<https://css-tricks.com/abem-useful-adaptation-bem/>

**Note: Use only the `lowercase` format for `className`.**

```tsx
  //GOOD 🏆🏆🏆
  export const Sample:React.FC = ({ children }) => (
    <div className="a-sample">{children}</div>
  );


  //NOT GOOD 💩💩💩
  export const Sample:React.FC = ({ children }) => (
    <div className="a-Sample">{children}</div>
  );
```

**Note: Use only the `Single_Underscore(_) && Single-Dash(-)` format for `className`.**

```tsx
  //GOOD 🏆🏆🏆
  export const Sample = () => (
    <div className="a-sample">
      <span className="a-sample_title">Title</span>
    </div>
  );


  //NOT GOOD 💩💩💩
  export const Sample = () => (
    <div className="a--sample">
      <span className="a--sample__title">Title</span>
    </div>
  );
```

**Note: The `className` must be formatted as `block_element-modifier`. But `Sometimes` it will be formatted as `block_element_element-modifier`.**

```tsx
  //GOOD 🏆🏆🏆
  export const Sample = () => (
    <div className="a-sample">
      <span className="a-sample_element">One Element</span>
    </div>
  );

  export const Sample = () => (
    <div className="a-sample">
      <span className="a-sample_element1_element2">Two elements</span>
    </div>
  );


  //NOT GOOD 💩💩💩
  export const Sample = () => (
    <div className="a-sample">
      <span className="a-sample_element1_element2_element3">Greater than 2 elements</span>
    </div>
  );
```

### `Atomic`

<https://bradfrost.com/blog/post/atomic-web-design/>

### `Components`

- Use only `React-Hook`
- Follow the `rules of hook` (<https://reactjs.org/docs/hooks-rules.html>)

**Note: Use `mapModifiers` to generate `modifiers`.**

```tsx
  export const Component: React.FC<Props> = props => (
    <div className={mapModifiers('a-sample', props.modifiers)}>{props.children}</div>
  );
```

**Note: Use `// eslint-disable-next-line react-hooks/exhaustive-deps` when you want to avoid checking of the `useEffect` syntax (also on `useMemo & useCallback`)**

```tsx
  useEffect(() => {
    Todo Something...
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
```

**Note: Use simple syntax when the component has no properties.**

```tsx
  //GOOD 🏆🏆🏆
  export const Component = () => (
    <div>Without children...</div>
  );

  export const Component: React.FC = ({ children }) => (
    <div>{children}</div>
  );


  //NOT GOOD 💩💩💩
  export const Component: React.FC = () => (
    <div>Without children...</div>
  );
```

**Note: Clearly define the data type of the property.**

```tsx
  //GOOD 🏆🏆🏆
  interface IProps {
    title: string;
  }

  //NOT GOOD 💩💩💩
  interface IProps {
    title: any;
  }
```

**Note: Please leave TODO when you encounter some unresolved issues immediately.**

```tsx
  export const Component = () => {

    // TODO: bla...bla...bla
    const Problems = 'Problems';

    return (
      <div>Todo Something...</div>
    );
  };
```

**Note: Use the filename as the component name. For example, Example.tsx should have a reference name of Example. However, for root components of a directory, use index.jsx as the filename and use the directory name as the component name:**

```tsx
  //GOOD 🏆🏆🏆
  import Example from 'components/atoms/Example';
  import {Symbol1} from 'path/from/root';
  import {Symbol2} from '../parent/file';
  import {Symbol3} from './sibling'; 

  //NOT GOOD 💩💩💩
  import Example from 'components/atoms/Example/index';
  import {Symbol3} from '../../../sibling'; 

```

### `Typescript`

<https://www.typescriptlang.org/index.htm>

### `Context API`

<https://legacy.reactjs.org/docs/context.html>

### `React-router-dom`

<https://reactrouter.com/web/guides/quick-start>

### `Naming`

* Do not use the `namespaces Foo {...}` construct.
* Do not use `require` (as in `import x = require(...)`) for imports. 
* Use ES6 Module syntax.

## `Names`
1. Local Variable & Property Names: Use camelCase. Use meaningful variable names: `productName, productDescription`.
2. Function: Use camelCase. Use meaningful function names: `handleSubmit(), setFullName(), useRequest()`. 
3. Enum: Use PascalCase. 
4. Interface: Use `I` as a prefix for interface names. `IProfile`.
5. Class Names: Use PascalCase.
6. Types: Use PascalCase.
7. Type Parameter: like in `Array<T>`, may use a single UpperCase character(`T`)
  ```tsx
  export interface Response<T = any> {
    code: string;
    data: T;
    message: string;
  }
  ```
8. Spaces: Use 2 spaces. Not tabs.
9. Semicolons: Use semicolons.
10. Filename: Name files with camelCase. `util.ts, map.ts` etc.

### `Git`

- Merge: <https://git-scm.com/docs/git-merge>
- Git branch format: <http://karma-runner.github.io/5.0/dev/git-commit-msg.html>

**Note: When create a new branch. The `type` will include `feature | bugfix | hotfix | release | support`**

```ssh
  git checkout -b type/user-name/feature-name
```
example: 
- feature/thang.nx/login
- hotfix/thang.nx/login

**Note: When committed. The `type` will include `feat | fix | hotfix | release | support`**

```ssh
  git commit -m ':emoji: type(feature-name): messages'
```
example:
- git commit -m '✨ feature: implement login'
- git commit -m '🐛 bug: fix bug validation login'


Commit Type | Emoji <https://gist.github.com/parmentf/035de27d6ed1dce0b36a>
----------  | -----
Initial Commit | [🎉  Party Popper](http://emojipedia.org/party-popper/)
Version Tag | [🔖  Bookmark](http://emojipedia.org/bookmark/)
New Feature | [✨  Sparkles](http://emojipedia.org/sparkles/)
Bugfix | [🐛  Bug](http://emojipedia.org/bug/)
Security Fix | [🔒  Lock](https://emojipedia.org/lock/)
Metadata | [📇  Card Index](http://emojipedia.org/card-index/)
Refactoring | [♻️  Black Universal Recycling Symbol](http://emojipedia.org/black-universal-recycling-symbol/)
Documentation | [📚  Books](http://emojipedia.org/books/)
Internationalization | [🌐  Globe With Meridians](http://emojipedia.org/globe-with-meridians/)
Accessibility | [♿  Wheelchair](https://emojipedia.org/wheelchair-symbol/)
Performance | [🐎  Horse](http://emojipedia.org/horse/)
Cosmetic | [🎨  Artist Palette](http://emojipedia.org/artist-palette/)
Tooling | [🔧  Wrench](http://emojipedia.org/wrench/)
Tests | [🚨  Police Cars Revolving Light](http://emojipedia.org/police-cars-revolving-light/)
Deprecation | [💩  Pile of Poo](http://emojipedia.org/pile-of-poo/)
Removal | [🗑️  Wastebasket](http://emojipedia.org/wastebasket/)
Work In Progress (WIP) | [🚧  Construction Sign](http://emojipedia.org/construction-sign/)
See more | [Be creative](http://www.emoji-cheat-sheet.com/)



# Quy trình Merge

## Merge để làm gì?
- **Merge** dùng để kết hợp các thay đổi từ nhánh này sang nhánh khác.
- Thường được sử dụng để lấy code mới từ nhánh chính (ví dụ `develop`) về nhánh, hoặc để hợp nhất các tính năng từ các nhánh phụ vào nhánh chính.
- **Merge** có thể xử lý conflict, và tất cả conflict sẽ được giải quyết trong một commit.

## Tại sao lại sử dụng Merge?
- Khi **merge**, tất cả conflict sẽ được giải quyết trong một commit, giúp tập trung xử lý xung đột tại một thời điểm nhất định.
- **Merge** không thay đổi lịch sử commit như **rebase**, điều này giúp việc theo dõi lịch sử phát triển của dự án dễ dàng hơn.
- **Merge** giữ nguyên các commit gốc, giúp bảo toàn các thông tin liên quan đến tiến trình phát triển, đặc biệt quan trọng khi cần kiểm tra lại các thay đổi trong tương lai.
- Dùng **merge** giúp tránh việc rewrite lại lịch sử commit, điều này giảm rủi ro xung đột code khi làm việc theo nhóm.

## Khi nào thì cần Merge?
- Khi cần lấy code từ nhánh chính (ví dụ `develop`) về nhánh để đảm bảo rằng nhánh có những thay đổi mới nhất.
- Khi hoàn thành tính năng hoặc sửa lỗi, và cần hợp nhất nhánh đó vào nhánh chính (`develop` hoặc `main`).
- Trước khi tạo Pull Request, cần **merge** nhánh chính vào nhánh để tránh xung đột sau này.
  
## Quy trình Merge
1. Lấy code mới nhất từ remote về và tiến hành merge vào nhánh:
   - `git fetch`
   - `git merge origin/develop`
   
2. Xử lý conflict nếu có:
   - Khi xảy ra conflict, Git sẽ chỉ ra những file bị xung đột. Cần mở các file này, xem xét và chỉnh sửa cho phù hợp.
   - Sau khi đã giải quyết conflict, commit những thay đổi đã xử lý bằng lệnh:
     - `git add <file>`
     - `git commit`
   
3. Kiểm tra kỹ code hiện tại sau khi merge:
   - Đảm bảo rằng sau khi merge, code vẫn hoạt động đúng và không phát sinh lỗi. Chạy các test cần thiết để xác nhận.

4. Đẩy code đã merge lên remote:
   - `git push`
   
---

# Quy trình Hotfix

## Khi nào sẽ cần Hotfix?
- Khi cần fix gấp các **lỗi nghiêm trọng** trên production mà không thể chờ để merge từ nhánh `develop` vào `production`.
- Hotfix có thể được dùng để phát triển nhanh một tính năng cần thiết cho production, **nhưng không nên lạm dụng**.

## Các bước thực hiện:
1. Tạo một nhánh hotfix từ nhánh production (nhánh này có thể khác nhau tùy dự án, ví dụ `main`):
   - Tên nhánh nên có dạng `hotfix/<tên-nhánh>`.
   
2. Tạo 2 Pull Request (PR) từ nhánh hotfix đó vào nhánh production và nhánh develop:
   - **PR vào production** phải được xử lý trước:
     - Xử lý conflict (nếu có) của PR vào nhánh production.
     - Merge PR vào nhánh production, nhưng **không được xoá nhánh hotfix**.
   
   - Sau khi merge vào production, xử lý **PR vào nhánh develop**:
     - Xử lý conflict (nếu có) của PR vào nhánh develop.
     - Merge PR vào nhánh develop và tick chọn ô xoá nhánh hotfix nếu cần.

---

# Quy trình tách nhánh
- Tất cả các nhánh phát triển tính năng hoặc sửa lỗi đều được tách từ nhánh chính là `develop`.
- Trong trường hợp nhánh phụ có các nhánh con, cần checkout từ nhánh phụ, phát triển tính năng, và sau đó merge lại vào nhánh phụ trước khi merge nhánh phụ đó vào nhánh chính `develop`.

# Tool GitKraken
- Link download: https://gitkraken.en.uptodown.com/windows/versions
- Down version 8.x
- Crack https://github.com/qsshs/GitKraKen-Crack
- Thực hiện clone về và thực hiện các bước trong Readme