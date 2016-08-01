#!/bin/bash
echo --- START OF BUILD ---

cd ~/workspace

echo ==========================================
echo
echo === Documenting [canvas-toolkit.js]
echo === Clearing output [docs/]
rm -fdr docs
echo ...

	jsdoc \
		--configure build/jsdoc.json	\
		ctk/util/AreaMap.js				\
		ctk/util/Canvas.js				\
		ctk/util/ProcessLoop.js			\
		ctk/draw/Draw.js				\
		ctk/draw/Rect.js				\
		ctk/draw/Border.js				\
		ctk/draw/Style.js				\
		ctk/draw/Item.js				\

echo ...
echo === Documentation succeeded. Wrote to [docs/]
echo
echo ==========================================
echo
echo === Compiling [canvas-toolkit.min.js]
ls -l canvas-toolkit.min.js
echo === Clearing output [canvas-toolkit.min.js]
rm -f canvas-toolkit.min.js
echo ...

	java -jar node_modules/google-closure-compiler/compiler.jar \
			--js										\
				ctk/util/AreaMap.js						\
				ctk/util/Canvas.js						\
				ctk/util/ProcessLoop.js					\
				ctk/draw/Draw.js						\
				ctk/draw/Rect.js						\
				ctk/draw/Border.js						\
				ctk/draw/Style.js						\
				ctk/draw/Item.js						\
			--js_output_file							\
				canvas-toolkit.min.js					\
			--externs									\
				"build/closure-compiler-externs.js"		\
			--compilation_level SIMPLE					\
			# --compilation_level ADVANCED				\
			# --warning_level VERBOSE					\
			# --process_common_js_modules				\

echo ...
ls -l canvas-toolkit.min.js
echo === Compilation succeeded. Wrote to [canvas-toolkit.min.js]
echo
echo ==========================================

echo --- END OF BUILD ---
