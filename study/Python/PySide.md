## 全局异常处理

```python
import os
import traceback

class Mainworkwindow(QMainWindow, Ui_MainWindow):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        
		self.old_hook = sys.excepthook
		sys.excepthook = self.catch_exceptions
	
	def catch_exceptions(self, ty, value, traceback):
	    """
	        捕获异常，并弹窗显示
	    :param ty: 异常的类型
	    :param value: 异常的对象
	    :param traceback: 异常的traceback
	    """
	    traceback_format = traceback.format_exception(ty, value, traceback)
	    traceback_string = "".join(traceback_format)
	    QtWidgets.QMessageBox.critical(None, "An exception was raised", "{}".format(traceback_string))
	    self.old_hook(ty, value, traceback)
```



## 事件

```python
class MyWindow(QWidget):
    def showEvent(self, a0):
        print('窗口被展开',a0)
    def closeEvent(self, a0):
        print('窗口关闭')
    def moveEvent(self, a0):
        print('窗口移动')
    def resizeEvent(self, a0):
        print('改变窗口尺寸')
    def mousePressEvent(self, a0):
        print('鼠标按下')
    def mouseReleaseEvent(self, a0):
        print('鼠标弹起')
    def mouseDoubleClickEvent(self, a0):
        print('鼠标双击')               #双击时候会触发鼠标弹起
    def enterEvent(self,a0):
        print('鼠标进入控件')
    def leaveEvent(self,a0):
        print('鼠标离开控件')
    def keyPressEvent(self, a0):
        print('键盘上有按键被按下')
    def keyReleaseEvent(self, a0):\
        print('键盘上有按键弹起')
    def focusInEvent(self, a0):
        print('获取焦点')
    def focusOutEvent(self, a0):
        print('失去焦点')
    def dragEnterEvent(self, a0):
        print('拖拽进入控件')
    def dragLeaveEvent(self, a0):
        print('拖拽离开控件')
    def dragMoveEvent(self, a0):
        print('在控件中拖拽')
    def dropEvent(self, a0):
        print('拖拽放下')
    def paintEvent(self, a0):
        print('绘制事件')
    def changeEvent(self, a0):
        print('改变事件')
    def contextMenuEvent(self, a0):
        print('右键菜单')
    def inputMethodEvent(self, a0):
        print('输入法调用')
        
# 如果一个控件没有处理该事件，则该事件会自动传递给父级控件进行处理。
class MyLabel(QLabel):
	def mousePressEvent(self, a0):
        a0.ignore()     #忽略事件，把事件传递给父级控件
        a0.accept()     #处理事件
        a0.isAccepted() #获取是否处理事件
```

## 交互状态

```python
btn.setEnabled()      #设定是否可用
btn.isEnabled()       #获取是否可用
btn.setVisible()      #设定是否可见
btn.setHidden()       #设置隐藏
btn.isHidden()        #基于父控件是否被隐藏（父控件不显示，子控件是可能不被隐藏的）
btn.isVisible()       #最终状态是否可见
btn.isVisibleTo()     #一个控件是否随着另一个控件的显示而显示
```



## 窗口Flags状态

```python
window.setWindowFlags() 设置状态

Qt.WindowFlags.MSWindowsFixedSizeDialogHint         #窗口大小无法调整
Qt.WindowFlags.FramelessWindowHint                  #窗口无边框，不可拖动大小，移动位置
Qt.WindowFlags.CustomizeWindowHint                  #无边框，可以拖动大小，不可移动
Qt.WindowFlags.WindowTitleHint                      #标题栏只有关闭按钮（且不可用？）
Qt.WindowFlags.WindowSystemMenuHint                 #效果同上？
Qt.WindowFlags.WindowMaximizeButtonHint             #标题栏内只激活最大化按钮
Qt.WindowFlags.WindowMinimizeButtonHint             #标题栏内只激活最小化按钮
Qt.WindowFlags.WindowCloseButtonHint                #标题栏只有关闭按钮(可用）
Qt.WindowFlags.WindowContextHelpButtonHint          #标题栏只有关闭按钮(不可用）问号按钮（可用）
Qt.WindowFlags.WindowStaysOnTopHint                 #窗口始终显示在最前
Qt.WindowFlags.WindowStaysOnBottomHint              #窗口始终显示在最后
```



## 最大化和最小化

```python
设置
window.showFullScreen()        #全屏
window.showMaximized()         #最大化
window.showMinimized()         #最小化
window.showNormal()            #正常显示
状态判断
window.isMinimized()
window.isMaximized()
window.isFullScreen()
```



## 窗口状态

```python
window.setWindowState(Qt.WindowStates.WindowNoState)         #无状态
window.setWindowState(Qt.WindowStates.WindowMaximized)       #窗口最大化
window.setWindowState(Qt.WindowStates.WindowMinimized)       #窗口最小化
window.setWindowState(Qt.WindowStates.WindowFullScreen)      #窗口全屏
window.setWindowState(Qt.WindowStates..WindowActive)          #活动窗口

window.windowState()                            #获取控件状态
```

