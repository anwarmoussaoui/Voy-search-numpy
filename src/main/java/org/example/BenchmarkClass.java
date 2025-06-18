package org.example;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.graalvm.polyglot.*;
import org.openjdk.jmh.annotations.*;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Warmup(iterations = 6, time = 10)
@Measurement(iterations = 6, time = 10)
@Fork(1)
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
@State(Scope.Benchmark)
public class BenchmarkClass {
    private static final String WASM_PATH = "./src/main/resources/voy_search_bg.wasm";
    private static final String JS_MODULE = "/voy.js";
    public final Context context;


    public BenchmarkClass () {
            Context context = createPolyglotContext();

        try {
            loadWasmModule(context);
            // Load JS module with your runVoySearch function
            context.eval(Source.newBuilder("js", Objects.requireNonNull(BenchmarkClass.class.getResource(JS_MODULE)))
                    .mimeType("application/javascript+module")
                    .build());
            this.context=context;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }



    }

    @Benchmark
    public void test() throws IOException {

            String fixedQuery = "AI and neural networks";
            List<Map<String, String>> sampleData = getSampleData();
            context.getBindings("js").getMember("runVoySearch").execute(sampleData, fixedQuery);



    }

    private static Context createPolyglotContext() {
        Map<String, String> options = new HashMap<>();
        options.put("js.webassembly", "true");
        options.put("js.text-encoding", "true");

        return Context.newBuilder("js", "wasm")
                .allowAllAccess(true)
                .options(options)
                .build();
    }

    private static void loadWasmModule(Context context) throws IOException {
        byte[] wasmfile = Files.readAllBytes(Paths.get(WASM_PATH));
        context.getBindings("js").putMember("wasmfile", wasmfile);
    }

    private static List<Map<String, String>> getSampleData() throws IOException {
        ObjectMapper mapper = new ObjectMapper();

        try (InputStream is = BenchmarkClass.class.getResourceAsStream("/sampleData.json")) {
            if (is == null) {
                throw new IOException("sampleData.json resource not found");
            }
            return mapper.readValue(is, new TypeReference<List<Map<String, String>>>() {
            });
        }
    }
}
