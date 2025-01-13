# Rust 技巧与库

## ratatui 构建 TUI

https://ratatui.rs/

> 需要注意的是当你在使用时 `ratatui::init();` 会让你进入原始模式，如果你需要在其中嵌入终端应用例如执行 `ssh` 命令，那么你需要在执行前关闭原始模式 `terminal::disable_raw_mode` 在使用完回到 TUI 时，你需要恢复原始模式 `ternimal::enable_raw_mode`

### 原始模式（`raw mode`）

原始模式的功能如下，为 TUI 界面的事件等提供后端支持

- 输入不转发到屏幕。
- 输入不在回车后处理。
- 输入不是缓冲行行。
- 特殊案件删除backspace和Ctrol+C将不由终端驱动处理。
- 新行特性将不被println!处理使用write!替换。

## 静态编译（低版本系统没有需要的动态链接库时）

## 使用MUSL进行静态编译

使用前需要检查是否存在对应的musl环境

`rustup target list`

如果看到

`x86_64-unknown-linux-musl (installed)` 

则无需安装否则如下命令安装环境

`rustup target add x86_64-unknown-linux-musl`

如果你是第一次使用musl编译那么你需要安装 `musl-tools`

`apt install musl-tools -y`

此时你就可以构建无依赖的Rust应用了

`cargo build --release --target=x86_64-unknown-linux-musl`

这时的Rust 的 release 文件位于
`./target/x86_64-unknown-linux-musl/release`



