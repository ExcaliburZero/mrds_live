--------------------
-- Configuration
--------------------

local output_filepath = "mrds_data.csv"

local update_interval = 0 -- seconds
local only_update_on_change = true

--------------------
-- Code
--------------------

function read_data()
    data = {}

    data["year"] = read_11110000(0x21B6560)
    data["month"] = read_00001100(0x21B6560)
    data["week"] = read_00000011(0x21B6560)

    data["week_full"] = data["week"] + 4 * (data["month"] + 12 * data["year"])

    data["gold"] = read_11111111(0x21B6690)

    data["name"] = read_ascii_string(0x21B66F8, 12)
    data["species_id"] = read_00001111(0x021B6708)

    data["lifespan"] = read_11110000(0x021B6718)
    data["age"] = read_00001111(0x021B6714)

    data["stress"] = read_11110000(0x021B6744)
    data["fatigue"] = read_00001111(0x021B6744)

    data["power"] = read_11110000(0x021B6720)
    data["intelligence"] = read_00001111(0x021B6720)
    data["skill"] = read_11110000(0x021B6724)
    data["speed"] = read_00001111(0x021B6724)
    data["defense"] = read_11110000(0x021B6728)
    data["life"] = read_00001111(0x021B6728)

    return data
end

function read_11111111(offset)
    return memory.readdwordunsigned(offset)
end

function read_11110000(offset)
    return bit.band(memory.readdwordunsigned(offset), 0x0000FFFF)
end

function read_00001111(offset)
    return bit.rshift(memory.readdwordunsigned(offset), 16)
end

function read_00001100(offset)
    return bit.rshift(bit.band(memory.readdwordunsigned(offset), 0x00FF0000), 16)
end

function read_00000011(offset)
    return bit.rshift(bit.band(memory.readdwordunsigned(offset), 0xFF000000), 24)
end

function read_ascii_string(offset, size)
    return decode_ascii_string(memory.readbyterange(offset, size))
end

function decode_ascii_string(bytes)
    s = ""
    for _, value in ipairs(bytes) do
        s = s .. string.char(value)
    end

    return s
end

-- Keep file handle open, so that we do not have to keep opening and closing it frequently.
-- 
-- Unfortunately there doesn't seem to be a good place to close it now...
local data_file = nil

function write_data(data)
    columns = {}
    for key, _ in pairs(data) do
        table.insert(columns, key)
    end
    table.sort(columns)

    -- Create the file if it does not already exist
    if data_file == nil then 
        f = io.open(output_filepath, "r")
        if not f then
            f = io.open(output_filepath, "w")

            -- Add the header row
            for i, key in ipairs(columns) do
                if i ~= 1 then
                    f:write(",")
                end

                f:write(key)
            end
            f:write("\n")
        end
        f:close()
    end

    -- Append the new data
    if data_file == nil then 
        data_file = io.open(output_filepath, "a+")
    end
    for i, key in ipairs(columns) do
        if i ~= 1 then
            data_file:write(",")
        end

        data_file:write(data[key])
    end
    data_file:write("\n")
    data_file:flush()
    --f:close()
end

function dictionaries_neq(dict_1, dict_2)
    for key, value in pairs(dict_1) do
        if value ~= dict_2[key] then
            return true
        end
    end

    return false
end

local last_update_time = 0
local previous_data = nil
function main()
    current_time = os.time()

    if current_time >= (last_update_time + update_interval) then
        data = read_data()
        last_update_time = current_time

        if previous_data == nil or dictionaries_neq(previous_data, data) or not only_update_on_change then
            previous_data = data

            data["current_time"] = current_time
            write_data(data)

            -- Remove the key so that it can be used for comparison in the next run of the function
            data["current_time"] = nil
        end
    end
end

gui.register(main)