#include <bits/stdc++.h>
#define maxn 1003
#define maxc 1000000003

using namespace std;

int x, y, k;

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    cin >> x >> y >> k;
    int ans = y / (x * 6 + k) * 6;
    y = y % (x * 6 + k);
    if(y == 0)
    {
        cout << ans;
        return 0;
    }
    if(x + k >= y)
    {
        cout << ans + 1;
        return 0;
    }
    cout << ans + (y - k - 1) / x + 1;
}
